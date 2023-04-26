package ethan.entelect.swipemarketplace.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    @OneToOne
    private UserAccount personA;
    @OneToOne
    @NotNull
    private UserAccount personB;
    @OneToMany
    private List<Message> messages;
    @ManyToMany
    private List<Tag> adminTags;
    @NotNull
    private LocalDateTime startedAt;
}
