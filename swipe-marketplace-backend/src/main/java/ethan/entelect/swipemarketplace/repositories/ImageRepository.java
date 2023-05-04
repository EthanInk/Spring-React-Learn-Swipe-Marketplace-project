package ethan.entelect.swipemarketplace.repositories;

import ethan.entelect.swipemarketplace.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
