package ethan.entelect.swipemarketplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class SwipeMarketplaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwipeMarketplaceApplication.class, args);
	}

}
