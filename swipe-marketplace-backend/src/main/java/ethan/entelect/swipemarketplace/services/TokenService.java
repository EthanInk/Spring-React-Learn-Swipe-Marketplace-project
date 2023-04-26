package ethan.entelect.swipemarketplace.services;

import org.springframework.security.core.Authentication;

public interface TokenService {
    public String createToken(Authentication authentication);
    public String createScope(Authentication authentication);
}

