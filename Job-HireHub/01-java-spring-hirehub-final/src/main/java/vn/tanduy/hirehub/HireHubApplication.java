package vn.tanduy.hirehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class HireHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(HireHubApplication.class, args);
    }
}
