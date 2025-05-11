package com.copyright.service;

import com.copyright.entity.User;
import com.copyright.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        User user = userRepository.findByUsernameAndDeleted(username, 0);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}