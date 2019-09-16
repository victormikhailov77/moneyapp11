package com.example.demo.repository;

import com.example.demo.entity.FilterParametersDto;
import com.example.demo.entity.Transfer;
import com.example.demo.entity.TransferDto;

import java.util.List;

public interface TransferRepository {
    Transfer add(TransferDto transferData);

    Transfer update(String txId, TransferDto transferData);

    List<Transfer> list(FilterParametersDto filterParams);

    Transfer get(String txId);

    boolean delete(String txId);

    void cleanup();
}

