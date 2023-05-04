package ethan.entelect.swipemarketplace.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePostDto {
    @NotNull
    private Long id;
    @NotNull
    private String title;
    @NotNull
    @Column(length = 2255)
    private String description;
    @NotNull
    @Column(length = 2255)
    private String address;
    @NotNull
    @PositiveOrZero
    private int price;
    private List<MultipartFile> newImages;
    private List<Long> oldImages;
    private String tags;
}
