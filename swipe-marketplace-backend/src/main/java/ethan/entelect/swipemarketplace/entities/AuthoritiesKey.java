package ethan.entelect.swipemarketplace.entities;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AuthoritiesKey implements Serializable {
    private String authority;
    private String username;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthoritiesKey that = (AuthoritiesKey) o;
        return Objects.equals(authority, that.authority) && Objects.equals(username, that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authority, username);
    }
}
