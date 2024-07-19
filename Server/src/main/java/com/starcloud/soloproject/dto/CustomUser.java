package com.starcloud.soloproject.dto;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CustomUser implements UserDetails {

    private Users user;         

    public CustomUser(Users user) {
        this.user = user;
    }

    /**
     * 권한 getter 메소드
     * 권한이 'ROLE_'로 시작하도록 설정
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 권한 목록이 null일 경우 빈 목록 반환
        if (user.getAuthList() == null) {
            return Collections.emptyList();
        }

        return user.getAuthList().stream()
                // 권한이 null이거나 빈 문자열이 아닌 경우만 필터링
                .filter(auth -> auth.getAuth() != null && !auth.getAuth().isEmpty())
                // 권한에 'ROLE_' 접두사 추가
                .map(auth -> new SimpleGrantedAuthority("ROLE_" + auth.getAuth()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getUserPw();
    }

    @Override
    public String getUsername() {
        return user.getUserId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // enabled 값이 0이면 false, 그렇지 않으면 true
        return user.getEnabled() != 0;
    }
}
