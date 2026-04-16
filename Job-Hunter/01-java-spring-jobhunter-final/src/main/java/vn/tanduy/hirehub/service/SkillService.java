package vn.tanduy.hirehub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.tanduy.hirehub.domain.Skill;
import vn.tanduy.hirehub.domain.User;
import vn.tanduy.hirehub.domain.res.ResultPaginationResponse;
import vn.tanduy.hirehub.domain.res.user.CreatedUserResponse;
import vn.tanduy.hirehub.repository.SkillRepository;
import vn.tanduy.hirehub.util.error.IdInvalidException;
import vn.tanduy.hirehub.util.response.FormatResultPagaination;

@RequiredArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public Skill create(Skill skill) throws Exception{
        if(this.skillRepository.existsByName(skill.getName())){
            throw new DataIntegrityViolationException("Skill name already exists");
        }
        return this.skillRepository.save(skill);
    }

    public Skill fetchSkillById(Long id) throws Exception {
        if(this.skillRepository.existsById(id)){
            return this.skillRepository.findById(id).get();
        }else{
            throw new IdInvalidException("The specified Skill ID is invalid");
        }
    }

    public Skill update(Skill skill) throws Exception{
        Skill currentSkill = this.fetchSkillById(skill.getId());
        if(skill.getName() != null && this.skillRepository.existsByName(skill.getName())){
            throw new DataIntegrityViolationException("Skill name already exists");
        }
        currentSkill.setName(skill.getName());
        return this.skillRepository.save(currentSkill);
    }

    public ResultPaginationResponse fetchAllSkill(Specification<Skill> spec, Pageable pageable){
        Page<Skill> skillPage = this.skillRepository.findAll(spec, pageable);
        ResultPaginationResponse response = FormatResultPagaination.createPaginationResponse(skillPage);
        return response;
    }

    public void deleteSkill(Long id) throws Exception {
        Skill currentSkill = this.fetchSkillById(id);
        if(currentSkill == null){
            throw new IdInvalidException("Skill ID is not found");
        }
        currentSkill.getJobs().forEach(
                job -> job.getSkills().remove(currentSkill)
        );
        currentSkill.getSubscribers().forEach(
                subs -> subs.getSkills().remove(currentSkill)
        );
        this.skillRepository.delete(currentSkill);
    }
}
