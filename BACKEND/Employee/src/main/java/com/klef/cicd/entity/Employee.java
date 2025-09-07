package com.klef.cicd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee_table")
public class Employee {
    
    @Id
    @Column(name = "employee_id")
    private int id;

    @Column(name = "employee_name", nullable = false, length = 50)
    private String name;

    @Column(name = "employee_gender", nullable = false, length = 10)
    private String gender; 

    @Column(name = "employee_department", nullable = false, length = 30)
    private String department;

    @Column(name = "employee_designation", nullable = false, length = 30)
    private String designation;

    @Column(name = "employee_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "employee_password", nullable = false, length = 50)
    private String password;

    @Column(name = "employee_contact", nullable = false, unique = true, length = 20)
    private String contact;

    @Column(name = "employee_salary", nullable = false)
    private double salary;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }

    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id 
            + ", name=" + name 
            + ", gender=" + gender 
            + ", department=" + department 
            + ", designation=" + designation
            + ", email=" + email 
            + ", password=" + password 
            + ", contact=" + contact 
            + ", salary=" + salary + "]";
    }
}
