package org.fastpay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Component
public class AccountRestClient implements AccountService
{

    private final String serviceUrl = "http://localhost:8095/api/accounts/";

    @Autowired
    private OAuth2RestTemplate oAuth2RestTemplate;

    @Override
    public PaymentStatus authorizePayment(String source, String destination, BigDecimal amount, String currency, String txID) {

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        Map map = new HashMap<String, String>();
        map.put("Content-Type", "application/json");
        headers.setAll(map);
        Map<String, String> payload = new HashMap<>();
        payload.put("source", source);
        payload.put("destination", destination);
        payload.put("amount", amount.toString());
        payload.put("currency", currency);
        payload.put("txid", txID);
        HttpEntity<?> request = new HttpEntity<>(payload, headers);
        ResponseEntity<PaymentStatus> result = oAuth2RestTemplate.postForEntity(serviceUrl, request, PaymentStatus.class);
        return result.getBody();
    }

    @Override
    public PaymentStatus cancelPayment(String txId) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        Map map = new HashMap<String, String>();
        map.put("Content-Type", "application/json");
        headers.setAll(map);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        ResponseEntity<PaymentStatus> result = oAuth2RestTemplate.exchange(serviceUrl + "{id}",
                HttpMethod.DELETE,
                request,
                PaymentStatus.class,
                txId
        );
        return result.getBody();
    }

    @Override
    public PaymentStatus deposit(String destination, BigDecimal amount, String currency, String txId) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        Map map = new HashMap<String, String>();
        map.put("Content-Type", "application/json");
        headers.setAll(map);
        Map<String, String> payload = new HashMap<>();
        payload.put("destination", destination);
        payload.put("amount", amount.toString());
        payload.put("currency", currency);
        payload.put("txid", txId);
        HttpEntity<?> request = new HttpEntity<>(payload, headers);
        ResponseEntity<PaymentStatus> result = oAuth2RestTemplate.postForEntity(serviceUrl + "deposit", request, PaymentStatus.class);
        return result.getBody();
    }

    @Override
    public PaymentStatus finalizePayment(String txId) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        Map map = new HashMap<String, String>();
        map.put("Content-Type", "application/json");
        headers.setAll(map);
        HttpEntity<?> request = new HttpEntity<>(null, headers);
        ResponseEntity<PaymentStatus> result = oAuth2RestTemplate.exchange(serviceUrl + "{id}",
                HttpMethod.PUT,
                request,
                PaymentStatus.class,
                txId
        );
        return result.getBody();
    }

    @Override
    public BigDecimal balance(String accountNumber, String currency) {
        return null;
    }

    @Override
    public void createAccount(String origin_account, String currency) {

    }
}
