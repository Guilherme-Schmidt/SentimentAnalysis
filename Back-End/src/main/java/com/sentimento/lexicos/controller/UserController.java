package com.sentimento.lexicos.controller;


import com.sentimento.lexicos.domain.User;
import com.sentimento.lexicos.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        if(userService.registerUser(user)!=null){
            return ResponseEntity.ok("Usuario Cadastrado!");
        }
        else{
            return ResponseEntity.badRequest().body("Usuario não cadastrado!");
        }
    }

    @PostMapping("/login")
    private ResponseEntity<String> login(@RequestBody User user) {
        if(userService.login(user.getEmail(), user.getPassword())){
            return ResponseEntity.ok("Usuario Logado!");
        }
        else{
            return ResponseEntity.status(401).body("Credenciais incorretas!");
        }
    }
}
