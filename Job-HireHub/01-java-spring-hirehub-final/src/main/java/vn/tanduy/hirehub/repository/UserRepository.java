package vn.tanduy.hirehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.tanduy.hirehub.domain.Company;
import vn.tanduy.hirehub.domain.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    User findByRefreshTokenAndEmail(String token,String email);
    List<User> findByCompany(Company company);
}
