package ethan.entelect.swipemarketplace.runners;

import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CreateUsers implements CommandLineRunner {

    private UserRepository userRepository;
    @Override
    public void run(String... args) throws Exception {
        UserAccount user = userRepository.findById("Ethan@gmail.com").orElse(null);
        if(user != null) return;
        user = new UserAccount();
        user.setEmail("Ethan@gmail.com");
        user.setName("Ethan");
        user.setSurname("Test");
        user.setAccountEnabled(true);
        userRepository.save(user);
        System.out.println("USER ADDED");
    }
}
