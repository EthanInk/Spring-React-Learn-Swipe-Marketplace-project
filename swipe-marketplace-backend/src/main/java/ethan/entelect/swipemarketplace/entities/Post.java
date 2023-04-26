package ethan.entelect.swipemarketplace.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
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
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String description;
    @NotNull
    private LocalDateTime postedAt;
    @NotNull
    private boolean postEnabled;
    private String postDisabledReason;
    @NotNull
    @PositiveOrZero
    private Integer price;
    @OneToMany
    private List<Image> images;
    @ManyToMany
    private List<Tag> tags;
    @ManyToOne
    private UserAccount postedBy;
}
