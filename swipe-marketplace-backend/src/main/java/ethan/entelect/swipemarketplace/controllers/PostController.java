package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.dtos.NewPostDto;
import ethan.entelect.swipemarketplace.dtos.UpdatePostDto;
import ethan.entelect.swipemarketplace.entities.Image;
import ethan.entelect.swipemarketplace.entities.Post;
import ethan.entelect.swipemarketplace.entities.Tag;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.ImageRepository;
import ethan.entelect.swipemarketplace.repositories.PostRepository;
import ethan.entelect.swipemarketplace.repositories.TagRepository;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import ethan.entelect.swipemarketplace.services.ImageUploadService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {
    private UserRepository userRepository;
    private PostRepository postRepository;
    private TagRepository tagRepository;
    private ImageRepository imageRepository;
    private ImageUploadService imageUploadService;

    @GetMapping
    public List<Post> getAllPosts(@RequestParam String pageNumber, @RequestParam String pageSize, @RequestParam String tags, Authentication authentication) {
        Pageable sortedByDateDesc = PageRequest.of(Integer.parseInt(pageNumber), Integer.parseInt(pageSize), Sort.by("postedAt").descending());
        List<Post> posts;
        if (authentication == null) {
            posts = postRepository.findAll(sortedByDateDesc).toList();
        } else {
            UserAccount userAccount = userRepository.findById(authentication.getName()).get();
            List<Post> doNotIncludePosts = new ArrayList<>();
            doNotIncludePosts.addAll(userAccount.getLikedPosts());
            doNotIncludePosts.addAll(userAccount.getDislikedPosts());
            List<Long> doNotIncludePostsIds = doNotIncludePosts.stream().map(Post::getId).toList();
            if (doNotIncludePostsIds.isEmpty()) {
                posts = postRepository.findAll(sortedByDateDesc).toList();
            } else {
                posts = postRepository.findAllByIdNotIn(doNotIncludePostsIds, sortedByDateDesc);
            }
        }
        return posts;
    }

    @GetMapping("/own")
    public List<Post> getSelfPosts(Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getPosts();
    }

    @PostMapping("/own")
    public ResponseEntity<Post> postNewPost(@Valid @ModelAttribute NewPostDto newPostDto, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        List<Tag> tags = Arrays.stream(newPostDto.getTags().split("#")).filter(tag ->
                !tag.trim().isEmpty()
        ).map(tag ->
                new Tag(tag.trim())
        ).map(tag ->
                tagRepository.findById(tag.getTag()).or(() ->
                        Optional.of(tagRepository.save(tag))
                ).get()
        ).toList();

        List<Image> uploadedImages = imageUploadService.uploadImagesGetURL(newPostDto.getImages());
        List<Image> savedImages = imageRepository.saveAll(uploadedImages);

        Post newUserPost = new Post();
        newUserPost.setTitle(newPostDto.getTitle());
        newUserPost.setDescription(newPostDto.getDescription());
        newUserPost.setAddress(newPostDto.getAddress());
        newUserPost.setPostedAt(LocalDateTime.now());
        newUserPost.setPostEnabled(true);
        newUserPost.setPrice(newPostDto.getPrice());
        newUserPost.setImages(savedImages);
        newUserPost.setTags(tags);
        newUserPost.setPostedBy(userAccount);

        postRepository.save(newUserPost);
        return new ResponseEntity<>(newUserPost, HttpStatus.CREATED);
    }
    @PatchMapping("/own")
    public ResponseEntity<Post> updatePost(@Valid @ModelAttribute UpdatePostDto updatePostDto, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        Post updatedPost = postRepository.findById(updatePostDto.getId()).orElse(null);

        if(updatedPost == null || !userAccount.getEmail().equalsIgnoreCase(updatedPost.getPostedBy().getEmail())) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Tag> updateTags = Arrays.stream(updatePostDto.getTags().split("#")).filter(tag ->
                !tag.trim().isEmpty()
        ).map(tag ->
                new Tag(tag.trim())
        ).map(tag ->
                tagRepository.findById(tag.getTag()).or(() ->
                        Optional.of(tagRepository.save(tag))
                ).get()
        ).toList();

        updatedPost.setTitle(updatePostDto.getTitle());
        updatedPost.setDescription(updatePostDto.getDescription());
        updatedPost.setAddress(updatePostDto.getAddress());
        updatedPost.setPrice(updatePostDto.getPrice());
        updatedPost.getTags().clear();
        updatedPost.getTags().addAll(updateTags);

        if(updatePostDto.getNewImages() != null && !updatePostDto.getNewImages().isEmpty()) {
            List<Image> newUploadedImages = imageUploadService.uploadImagesGetURL(updatePostDto.getNewImages());
            imageRepository.saveAll(newUploadedImages);
            List<Image> newSavedList = new ArrayList<>(newUploadedImages);
            updatePostDto.getOldImages().forEach(imageId -> {
                var imageOptional = imageRepository.findById(imageId);
                imageOptional.ifPresent(newSavedList::add);
            });
            updatedPost.getImages().clear();
            updatedPost.getImages().addAll(newSavedList);
        }

        postRepository.save(updatedPost);
        return new ResponseEntity<>(updatedPost, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Post getSelfPost(@PathVariable Long id) {
        return postRepository.findById(id).orElse(null);
    }

    @GetMapping("/liked")
    public List<Post> getSelfLikedPosts(@RequestParam String pageNumber, @RequestParam String pageSize, @RequestParam String tags, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getLikedPosts();
    }

    @PostMapping("/liked/{id}")
    public ResponseEntity<String> addSelfLikedPosts(@PathVariable Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        if (userAccount.getLikedPosts().stream().anyMatch((streamPost -> Objects.equals(streamPost.getId(), id)))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userAccount.getLikedPosts().add(postOptional.get());
        userRepository.save(userAccount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/disliked")
    public List<Post> getSelfDislikedPosts(@RequestParam String pageNumber, @RequestParam String pageSize, @RequestParam String tags, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getDislikedPosts();
    }

    @PostMapping("/disliked/{id}")
    public ResponseEntity<String> addSelfDislikedPosts(@PathVariable Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        if (userAccount.getDislikedPosts().stream().anyMatch((streamPost -> Objects.equals(streamPost.getId(), id)))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userAccount.getDislikedPosts().add(postOptional.get());
        userRepository.save(userAccount);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
