package org.fastpay.resource;

import org.fastpay.entity.TransferDto;
import org.fastpay.service.AccountService;
import org.fastpay.service.PaymentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/accounts", produces= MediaType.APPLICATION_JSON_VALUE)
public class AccountResource
{

    @Autowired
    AccountService accountService;

    @RequestMapping(method= RequestMethod.POST)
    @PreAuthorize("hasAnyAuthority('ROLE_USE_ACCOUNT')")
    public ResponseEntity<PaymentStatus> authorizePayment(@RequestBody TransferDto dto) {
        return new ResponseEntity(accountService.authorizePayment(dto.getSource(), dto.getDestination(), dto.getAmount(), dto.getCurrency(), dto.getTxid()), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT, value="{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USE_ACCOUNT')")
    public ResponseEntity<PaymentStatus> finalizePayment(@PathVariable("id") String txId) {
        return new ResponseEntity(accountService.finalizePayment(txId), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value="{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USE_ACCOUNT')")
    public ResponseEntity<PaymentStatus> cancelPayment(@PathVariable("id") String txId) {
        return new ResponseEntity(accountService.cancelPayment(txId), HttpStatus.OK);
    }

    @RequestMapping(value="deposit", method= RequestMethod.POST)
    @PreAuthorize("hasAnyAuthority('ROLE_USE_ACCOUNT')")
    public ResponseEntity<PaymentStatus> deposit(@RequestBody TransferDto dto) {
        return new ResponseEntity(accountService.deposit(dto.getDestination(), dto.getAmount(), dto.getCurrency(), dto.getTxid()), HttpStatus.OK);
    }

    @RequestMapping(value="balance/{id}", method= RequestMethod.GET)
    @PreAuthorize("hasAnyAuthority('ROLE_USE_ACCOUNT')")
    public ResponseEntity<BigDecimal> balance(@PathVariable("id") String accountNumber, @RequestParam(name = "currency", required=false) String currency) {
        return new ResponseEntity(accountService.balance(accountNumber, Optional.ofNullable(currency).orElse("")), HttpStatus.OK);
    }




}
