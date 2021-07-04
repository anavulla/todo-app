package com.mycom.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author anavulla
 *
 */
@Entity
public class Item {

	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", name=" + name + ", is_done=" + is_done + ", details=" + details
				+ ", to_do_date=" + to_do_date + "]";
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private Long itemId;
	private String name;
	private Boolean is_done;
	private String details;
	private Date to_do_date;

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIs_done() {
		return is_done;
	}

	public void setIs_done(Boolean is_done) {
		this.is_done = is_done;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Date getTo_do_date() {
		return to_do_date;
	}

	public void setTo_do_date(Date to_do_date) {
		this.to_do_date = to_do_date;
	}

}
