package com.example.demo.resource;

import com.example.demo.entity.FilterParametersDto;
import com.example.demo.entity.Transfer;
import com.example.demo.entity.TransferDto;
import com.example.demo.entity.TransferStatus;
import com.example.demo.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.function.Function;

import static com.example.demo.common.QueryParameterValidator.*;

@RestController
@RequestMapping(value="/transfer", produces= MediaType.APPLICATION_JSON_VALUE)
public class TransferResource {

    @Autowired
    private TransferService transferService;

    @RequestMapping(method= RequestMethod.POST)
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<Transfer> createTransfer(@RequestBody TransferDto dto) {

        Transfer result = transferService.createTransfer(dto);
        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value="{id}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<Transfer> getTransferById(@PathVariable("id") String id) {
        return new ResponseEntity(transferService.getTransferDetails(id), HttpStatus.OK);
    }
//
    @RequestMapping(method = RequestMethod.GET)
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<List> getAllTransfers(@RequestParam(name = "source", required=false) String source, @RequestParam(name = "destination", required=false) String destination,
                @RequestParam(name = "title", required=false) String title, @RequestParam(name = "currency", required=false) String currency, @RequestParam(name = "amount", required=false) String amount,
                @RequestParam(name = "status", required=false) String status, @RequestParam(name = "order", required=false) String order, @RequestParam(name = "sort", required=false) String sort, @RequestParam(name = "limit", required=false) String limit) {
        FilterParametersDto filterParams = new FilterParametersDto();
        filterParams.setLimit(getNumberParameter(limit));
        filterParams.setSort(sort);
        filterParams.setOrder(getSortOrder(order));
        filterParams.setStatus(getTransferStatus(status));
        filterParams.setCurrency(getCurrency(currency));
        filterParams.setSource(source);
        filterParams.setDestination(destination);
        filterParams.setTitle(title);
        filterParams.setAmount(getMoney(amount));
        return new ResponseEntity(transferService.getTransfers(filterParams), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value="{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<Transfer> executeTransfer(@PathVariable("id") String id) {
        return updateOperationTemplate(id, transferService::executeTransfer);
    }

    @RequestMapping(method = RequestMethod.DELETE, value="{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<Transfer> cancelTransfer(@PathVariable("id") String id) {
        return updateOperationTemplate(id, transferService::cancelTransfer);
    }

    private ResponseEntity<Transfer> updateOperationTemplate(String id, Function<String, TransferStatus> operation) {
        Transfer result = transferService.getTransferDetails(id);
        if (result == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        TransferStatus status = operation.apply(result.getId());
        if (!status.equals(TransferStatus.ERROR)) {
            return new ResponseEntity(transferService.getTransferDetails(id), HttpStatus.OK);
        } else {
            return new ResponseEntity(transferService.getTransferDetails(id), HttpStatus.CONFLICT);
        }
    }

}
