package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.dtos.UserAccountDto;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
@AllArgsConstructor
public class AccountController {
    private UserRepository userRepository;
    @GetMapping
    public UserAccount getSelfUserDetails(Authentication authentication){
        return userRepository.findById(authentication.getName()).get();
    }

    @PatchMapping
    public ResponseEntity<UserAccountDto> updateSelfUserDetails(@Valid @RequestBody UserAccountDto updatedUserAccount, Authentication authentication){
        UserAccount user = userRepository.findById(authentication.getName()).get();
        user.setName(updatedUserAccount.getName());
        user.setSurname(updatedUserAccount.getSurname());
        userRepository.save(user);
        return new ResponseEntity<>(updatedUserAccount, HttpStatus.CREATED);
    }
}
