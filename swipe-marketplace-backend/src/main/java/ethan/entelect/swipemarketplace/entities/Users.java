package ethan.entelect.swipemarketplace.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Users implements UserDetails {

    @Id
    @Column(length = 500)
    private String username;
    @Column(length = 500)
    private String password;
    private boolean enabled;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Authorities> authorities;

    public Users(String username, String password, List<Authorities> authorities){
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.enabled = true;
    }
    @Override
    public List<Authorities> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
