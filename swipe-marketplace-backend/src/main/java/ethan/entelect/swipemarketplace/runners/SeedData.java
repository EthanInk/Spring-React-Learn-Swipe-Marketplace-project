package ethan.entelect.swipemarketplace.runners;

import ethan.entelect.swipemarketplace.entities.*;
import ethan.entelect.swipemarketplace.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Component
public class SeedData implements CommandLineRunner {

    private UserAccountRepository userAccountRepository;
    private TagRepository tagRepository;
    private PostRepository postRepository;
    private ImageRepository imageRepository;
    private UserRepository userRepository;
    private AuthoritiesRepository authoritiesRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Users newUser = new Users();
        newUser.setUsername("Ethan@gmail.com");
        newUser.setPassword(bCryptPasswordEncoder.encode("Ethan"));
        newUser.setEnabled(true);
        Authorities authorities = new Authorities(new AuthoritiesKey("Ethan@gmail.com","USER"));
        authoritiesRepository.save(authorities);
        newUser.setAuthorities(List.of(authorities));
        userRepository.save(newUser);


        UserAccount user = userAccountRepository.findById("Ethan@gmail.com").orElse(null);
        if (user != null) return;
        user = new UserAccount();
        user.setEmail("Ethan@gmail.com");
        user.setName("Ethan");
        user.setSurname("Test");
        user.setAccountEnabled(true);
        userAccountRepository.save(user);

        Tag tag = new Tag("Cat");
        tagRepository.save(tag);

        Image image1 = new Image();
        image1.setUrl("https://swipe-marketplace.s3.af-south-1.amazonaws.com/userUploads/cat.png");
        imageRepository.save(image1);
        Image image2 = new Image();
        image2.setUrl("https://swipe-marketplace.s3.af-south-1.amazonaws.com/userUploads/cat.png");
        imageRepository.save(image2);

        Post post1 = new Post();
        post1.setTitle("Test 1 post title");
        post1.setDescription("Test 1 post description");
        post1.setAddress("Test 1 Address, Cape Town");
        post1.setPostedAt(LocalDateTime.now());
        post1.setPostEnabled(true);
        post1.setPrice(1000);
        post1.setImages(List.of(image1));
        post1.setTags(List.of(tag));
        post1.setPostedBy(user);

        Post post2 = new Post();
        post2.setTitle("Test 2 post title");
        post2.setDescription("Test 2 post description");
        post2.setAddress("Test 2 Address, Cape Town");
        post2.setPostedAt(LocalDateTime.now());
        post2.setPostEnabled(true);
        post2.setPrice(1000);
        post2.setImages(List.of(image2));
        post2.setTags(List.of(tag));
        post2.setPostedBy(user);


        postRepository.save(post1);
        postRepository.save(post2);
    }
}
