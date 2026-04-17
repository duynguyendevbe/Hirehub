package vn.tanduy.hirehub.controller;

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.tanduy.hirehub.domain.Permission;
import vn.tanduy.hirehub.domain.Skill;
import vn.tanduy.hirehub.domain.res.ResultPaginationResponse;
import vn.tanduy.hirehub.service.PermissionService;
import vn.tanduy.hirehub.util.annotation.ApiMessage;

@RequestMapping(path = "${apiPrefix}/permissions")
@RestController
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @PostMapping("")
    @ApiMessage("Create a permission")
    public ResponseEntity<Permission> create(@Valid @RequestBody Permission permission) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.permissionService.create(permission));
    }

    @PutMapping("")
    @ApiMessage("Update a permission")
    public ResponseEntity<Permission> update(@Valid @RequestBody Permission permission) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(this.permissionService.update(permission));
    }

    @GetMapping("")
    @ApiMessage("fetch all permission")
    public ResponseEntity<ResultPaginationResponse> getAll(
            @Filter Specification<Permission> spec,
            Pageable pageable
    ){
        return ResponseEntity.status(HttpStatus.OK).body(
                this.permissionService.fetchAll(spec, pageable)
        );
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a permission")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) throws Exception{
        this.permissionService.delete(id);
        return ResponseEntity.ok().body(null);
    }
}
