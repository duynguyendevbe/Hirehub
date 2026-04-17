package vn.tanduy.hirehub.controller;

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.tanduy.hirehub.domain.Company;
import vn.tanduy.hirehub.domain.Job;
import vn.tanduy.hirehub.domain.res.ResultPaginationResponse;
import vn.tanduy.hirehub.service.CompanyService;
import vn.tanduy.hirehub.util.annotation.ApiMessage;


@RequestMapping(path = "${apiPrefix}/companies")
@RestController
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping("")
    @ApiMessage("Create a company")
    public ResponseEntity<Company> createCompany(@Valid @RequestBody Company company){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.companyService.createCompany(company));
    }

    @GetMapping("")
    @ApiMessage("Fetch all company data")
    public ResponseEntity<ResultPaginationResponse> getAllCompany(
            @Filter Specification<Company> spec,
            Pageable pageable
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.companyService.getAllCompany(pageable, spec));
    }

    @PutMapping("")
    @ApiMessage("Update a company")
    public ResponseEntity<Company> updateCompany(
            @Valid @RequestBody Company company
    ){
        return ResponseEntity.ok(this.companyService.updateCompany(company));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a company")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable("id") Long id
    ){
        this.companyService.deleteCompany(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}")
    @ApiMessage("Get company by id")
    public ResponseEntity<Company> getCompany(@PathVariable("id") Long id) throws Exception{
        return ResponseEntity.ok().body(this.companyService.findCompanyById(id));
    }
}
