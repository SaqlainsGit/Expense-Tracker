package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;

@RestController
@RequestMapping("/expense")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

	@Autowired
	private ExpenseRepository expenseRepository;
	
	@PostMapping("/add")
	public Expense addExpense(@RequestBody Expense expense, Authentication auth){
		expense.setUsername(auth.getName());
		return expenseRepository.save(expense);
	}
	
	@GetMapping("/all")
	public List<Expense> getAllExpense(){
		return expenseRepository.findAll();
	}
	
	@GetMapping("/my")
	public List<Expense> getMyExpense( Authentication auth) {
		return expenseRepository.findByUsername(auth.getName());
	}
	
	@DeleteMapping("/{id}")
	public String deleteExpense(@PathVariable Long id) {
		expenseRepository.deleteById(id);
		return "Expense Deleted";
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Expense> editExpenese(@RequestBody Expense expense, @PathVariable Long id) {
		return expenseRepository.findById(id)
				.map(updatedExpense -> {
					updatedExpense.setAmount(expense.getAmount());
					updatedExpense.setTitle(expense.getTitle());
					updatedExpense.setDate(expense.getDate());
					Expense updated = expenseRepository.save(updatedExpense);
					return ResponseEntity.ok(updated);
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/{id}")
	public Expense getExpenseById(@PathVariable Long id) {
	    return expenseRepository.findById(id).orElse(null);
	}

}