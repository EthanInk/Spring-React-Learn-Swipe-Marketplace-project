package ethan.entelect.swipemarketplace.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountDto {
    @NotNull
    private String name;
    @NotNull
    private String surname;
}
