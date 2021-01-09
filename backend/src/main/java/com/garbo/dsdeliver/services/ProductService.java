package com.garbo.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.garbo.dsdeliver.dto.ProductDTO;
import com.garbo.dsdeliver.entities.Product;
import com.garbo.dsdeliver.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true) //Para evitar lock no banco já que é só leitura
	public List<ProductDTO> findAll(){
		List<Product> list = repository.findAllByOrderByNameAsc();
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList()); //Convertendo a lista de produtos para DTO. Primeiro para stream e depois volta para lista
		
	}
}
