package vn.tanduy.hirehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.tanduy.hirehub.domain.Subscriber;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long>,
                JpaSpecificationExecutor<Subscriber> {
        Subscriber findByEmail(String email);
        boolean existsByEmail(String email);
}
