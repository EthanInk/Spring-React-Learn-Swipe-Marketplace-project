package ethan.entelect.swipemarketplace.security;

import ethan.entelect.swipemarketplace.entities.Users;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepository.findByUsername(username);
        if (users == null) {
            throw new UsernameNotFoundException("Users not found with username: " + username);
        }
        return new Users(users.getUsername(), users.getPassword(), users.getAuthorities());
    }
}

