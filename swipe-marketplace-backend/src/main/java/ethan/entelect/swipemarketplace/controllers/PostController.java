package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.entities.Conversation;
import ethan.entelect.swipemarketplace.entities.Post;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.PostRepository;
import ethan.entelect.swipemarketplace.repositories.TagRepository;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {
    private UserRepository userRepository;
    private PostRepository postRepository;
    private TagRepository tagRepository;

    @GetMapping
    public List<Post> getSelfConversations(@RequestParam String pageNumber, @RequestParam String pageSize, @RequestParam String tags) {
        Pageable sortedByDateDesc = PageRequest.of(Integer.parseInt(pageNumber), Integer.parseInt(pageSize), Sort.by("postedAt").descending());
        return postRepository.findAll(sortedByDateDesc).toList();
    }

    @GetMapping("/own")
    public List<Post> getSelfPosts(Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getPosts();
    }

    @GetMapping("/post/:id")
    public Post getSelfPost(@RequestParam Long id, Authentication authentication) {
        return postRepository.findById(id).orElse(null);
    }

    @GetMapping("/liked")
    public List<Post> getSelfLikedPosts(@RequestParam Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getLikedPosts();
    }

    @PostMapping("/liked/:id")
    public ResponseEntity<String> addSelfLikedPosts(@RequestParam Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        if (userAccount.getLikedPosts().stream().anyMatch((streamPost -> Objects.equals(streamPost.getId(), id)))) {
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userAccount.getLikedPosts().add(postOptional.get());
        userRepository.save(userAccount);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/disliked")
    public List<Post> getSelfDislikedPosts(@RequestParam Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        return userAccount.getDislikedPosts();
    }

    @PostMapping("/disliked/:id")
    public ResponseEntity<String> addSelfDislikedPosts(@RequestParam Long id, Authentication authentication) {
        UserAccount userAccount = userRepository.findById(authentication.getName()).get();
        if (userAccount.getDislikedPosts().stream().anyMatch((streamPost -> Objects.equals(streamPost.getId(), id)))) {
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userAccount.getDislikedPosts().add(postOptional.get());
        userRepository.save(userAccount);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
