package ethan.entelect.swipemarketplace.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Authorities implements GrantedAuthority {
    @EmbeddedId
    private AuthoritiesKey authoritiesKey;

    @Override
    public String getAuthority() {
        return authoritiesKey.getAuthority();
    }
}

