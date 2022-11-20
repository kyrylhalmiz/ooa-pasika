package com.rentler.account.mapper;

import com.rentler.account.dto.AccountDto;
import com.rentler.account.entity.Account;
import com.rentler.helper.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper extends Mapper<Account, AccountDto> {

    @Autowired
    public AccountMapper() {
        super(Account.class, AccountDto.class);
    }

}

