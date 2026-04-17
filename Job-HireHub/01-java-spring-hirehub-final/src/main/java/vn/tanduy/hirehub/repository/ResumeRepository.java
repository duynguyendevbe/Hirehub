package vn.tanduy.hirehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.tanduy.hirehub.domain.Resume;

@Repository
public interface ResumeRepository extends
        JpaRepository<Resume, Long>,
        JpaSpecificationExecutor<Resume> {

}
