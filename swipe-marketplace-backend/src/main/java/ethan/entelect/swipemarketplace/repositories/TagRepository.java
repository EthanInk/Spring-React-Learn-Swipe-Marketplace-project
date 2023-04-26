package ethan.entelect.swipemarketplace.repositories;

import ethan.entelect.swipemarketplace.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, String> {
}
