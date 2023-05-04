package ethan.entelect.swipemarketplace.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
    @JsonIgnore
    private boolean accountEnabled;
    @JsonIgnore
    private String accountDisabledReason;
    @OneToMany(mappedBy = "postedBy")
    @JsonIgnore
    private List<Post> posts;
    @ManyToMany
    @JsonIgnore
    private List<Post> likedPosts;
    @ManyToMany
    @JsonIgnore
    private List<Post> dislikedPosts;
    @ManyToMany
    @JsonIgnore
    private List<Conversation> conversations;
}


