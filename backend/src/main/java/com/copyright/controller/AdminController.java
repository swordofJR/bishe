package com.copyright.controller;

import com.copyright.entity.Copyright;
import com.copyright.service.CopyrightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private CopyrightService copyrightService;

    /**
     * 获取所有待审核版权
     */
    @GetMapping("/copyrights/pending")
    public ResponseEntity<List<Copyright>> getPendingCopyrights() {
        return ResponseEntity.ok(copyrightService.getPendingCopyrights());
    }

    /**
     * 审核版权
     */
    @PostMapping("/copyrights/{id}/review")
    public ResponseEntity<Copyright> reviewCopyright(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String reason) {

        // 只接受 APPROVED 或 REJECTED 状态
        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            return ResponseEntity.badRequest().build();
        }

        Copyright copyright = copyrightService.reviewCopyright(id, status, reason);
        if (copyright != null) {
            return ResponseEntity.ok(copyright);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * 获取所有版权
     */
    @GetMapping("/copyrights")
    public ResponseEntity<List<Copyright>> getAllCopyrights() {
        return ResponseEntity.ok(copyrightService.getAllCopyrights());
    }
}