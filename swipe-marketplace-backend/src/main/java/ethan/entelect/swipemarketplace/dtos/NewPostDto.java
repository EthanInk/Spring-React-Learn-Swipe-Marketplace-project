package ethan.entelect.swipemarketplace.dtos;

import ethan.entelect.swipemarketplace.entities.Image;
import ethan.entelect.swipemarketplace.entities.Tag;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import jakarta.persistence.*;
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
public class NewPostDto {
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
    private List<MultipartFile> images;
    private String tags;
}
