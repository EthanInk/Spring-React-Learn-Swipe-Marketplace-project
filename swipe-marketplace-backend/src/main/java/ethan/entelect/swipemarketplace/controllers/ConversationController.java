package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.dtos.NewConversationDto;
import ethan.entelect.swipemarketplace.dtos.NewMessageDto;
import ethan.entelect.swipemarketplace.entities.Conversation;
import ethan.entelect.swipemarketplace.entities.Message;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.ConversationRepository;
import ethan.entelect.swipemarketplace.repositories.UserAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/conversations")
@AllArgsConstructor
public class ConversationController {
    private UserAccountRepository userAccountRepository;
    private ConversationRepository conversationRepository;
    @GetMapping
    public List<Conversation> getSelfConversations(Authentication authentication){
        UserAccount userAccount = userAccountRepository.findById(authentication.getName()).get();
        return userAccount.getConversations();
    }

    @GetMapping("conversation/:id")
    public Conversation getSelfConversations(@RequestParam Long id, Authentication authentication){
        Conversation conversation = conversationRepository.findById(id).orElse(null);
        if (conversation == null) return null;
        if (conversation.getPersonA().getEmail() != authentication.getName() &&
                conversation.getPersonB().getEmail() != authentication.getName())
            return null;
        return conversation;
    }

    @PostMapping
    public ResponseEntity<Conversation> getSelfConversations(@RequestBody NewConversationDto newConversationDto, Authentication authentication){
        UserAccount selfUser = userAccountRepository.findById(authentication.getName()).orElse(null);
        if (selfUser == null) return null;
        UserAccount postCreatorUser = userAccountRepository.findById(newConversationDto.getUsernameOfPoster()).orElse(null);
        if (postCreatorUser == null) return null;
        Conversation newConversation = new Conversation();
        newConversation.setPersonA(selfUser);
        newConversation.setPersonB(postCreatorUser);
        newConversation.setStartedAt(LocalDateTime.now());
        conversationRepository.save(newConversation);
        return new ResponseEntity<>(newConversation, HttpStatus.CREATED);
    }

    @PostMapping("/message")
    public ResponseEntity<Message> sendMessage(@RequestBody NewMessageDto newMessageDto, Authentication authentication){
        Conversation conversation = conversationRepository.findById(newMessageDto.getConversationId()).orElse(null);
        Message newMessage = new Message();
        newMessage.setMessage(newMessageDto.getMessage());
        newMessage.setSentByUsername(authentication.getName());
        newMessage.setSentAt(LocalDateTime.now());
        conversation.getMessages().add(newMessage);
        conversationRepository.save(conversation);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }
}
