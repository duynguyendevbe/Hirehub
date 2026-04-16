package vn.tanduy.hirehub.domain.dto;

import lombok.Getter;
import lombok.Setter;
import vn.tanduy.hirehub.domain.Role;
import vn.tanduy.hirehub.util.constant.GenderEnum;
import vn.tanduy.hirehub.domain.Company;


@Getter
@Setter
public class UpdateUserDTO {
    private Long id;

    private String name;

    private int age;

    private String address;

    private GenderEnum gender;

    private Company company;

    private Role role;
}
