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
public class NewMessageDto {
    @NotNull
    private Long conversationId;
    @NotNull
    private String message;
}
