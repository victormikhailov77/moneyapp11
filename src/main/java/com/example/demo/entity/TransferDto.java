package com.example.demo.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferDto {
    protected String source;
    protected String destination;
    protected BigDecimal amount;
    protected String currency;
    protected String title;

}
