package ethan.entelect.swipemarketplace.repositories;

import ethan.entelect.swipemarketplace.entities.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
