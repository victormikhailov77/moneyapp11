package com.example.demo.service;

import com.example.demo.entity.FilterParametersDto;
import com.example.demo.entity.Transfer;
import com.example.demo.entity.TransferDto;
import com.example.demo.entity.TransferStatus;

import java.util.List;

public interface TransferService {
    Transfer createTransfer(TransferDto transferData);

    List<Transfer> getTransfers(FilterParametersDto filterParams);

    Transfer getTransferDetails(String txId);

    TransferStatus cancelTransfer(String txId);

    TransferStatus executeTransfer(String txId);

    void cleanup();

}