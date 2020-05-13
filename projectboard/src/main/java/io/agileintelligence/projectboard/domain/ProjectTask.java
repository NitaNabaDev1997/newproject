package io.agileintelligence.projectboard.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "sales_database")
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Product cannot be blank")
    private String product_name;
    private String date_of_sale;
    private String sale_status;

    public ProjectTask() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


	public String getProduct_name() {
		return product_name;
	}


	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}


	public String getDate_of_sale() {
		return date_of_sale;
	}


	public void setDate_of_sale(String date_of_sale) {
		this.date_of_sale = date_of_sale;
	}


	public String getSale_status() {
		return sale_status;
	}


	public void setSale_status(String sale_status) {
		this.sale_status = sale_status;
	}

   
}
