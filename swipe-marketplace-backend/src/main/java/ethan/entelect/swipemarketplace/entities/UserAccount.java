package ethan.entelect.swipemarketplace.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserAccount {
    @Id
    @Email
    private String email;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private boolean accountEnabled;
    private String accountDisabledReason;
    @OneToMany(mappedBy = "postedBy")
    private List<Post> posts;
    @OneToMany
    private List<Post> likedPosts;
    @OneToMany
    private List<Post> dislikedPosts;
    @OneToMany
    private List<Conversation> conversations;
}


