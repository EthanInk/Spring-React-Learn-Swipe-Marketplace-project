package ethan.entelect.swipemarketplace.repositories;

import ethan.entelect.swipemarketplace.entities.Authorities;
import ethan.entelect.swipemarketplace.entities.AuthoritiesKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthoritiesRepository extends JpaRepository<Authorities, AuthoritiesKey> {
}
