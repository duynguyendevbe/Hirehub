package vn.tanduy.hirehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.tanduy.hirehub.domain.Company;
import vn.tanduy.hirehub.domain.User;

import java.util.List;

@Repository
public interface CompanyRepository
        extends
        JpaRepository<Company, Long>,
        JpaSpecificationExecutor<Company>
{
}
