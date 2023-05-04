package ethan.entelect.swipemarketplace.repositories;

import ethan.entelect.swipemarketplace.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserAccount, String> {
}
