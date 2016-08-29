# commons-microservices-db
This artifact is the use to obtain common datasources & schema swappable datasource.

#### Common datasource points to System database
#### Schema swappable datasource points to the client specific database schema.

## Usage

1. You need to include below module dependencies.

```xml
<dependency>
	<groupId>com.siemens.rcs</groupId>
	<artifactId>commons-microservices-rest-auth</artifactId>
	<version>${version}</version>
</dependency>
  
  <dependency>
	<groupId>com.siemens.rcs</groupId>
	<artifactId>commons-microservices-db</artifactId>
	<version>${version}</version>
</dependency>
```
artifact commons-microservices-db required commons-microservices-rest-auth dependency because the runtime exceptions thrown at DAO layer are defined inside commons-microservices-rest-auth module
& same classes are used.

2. Define & use beans available in commons-microservices-db artifact
  1. You need to define xml or annoted bean to use schema swappable
  e.g. schema-swappable-config.xml

  ```xml
  	<?xml version="1.0" encoding="UTF-8"?>

	<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p" 
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:tx="http://www.springframework.org/schema/tx" 
    xmlns:aop="http://www.springframework.org/schema/aop" 
    
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
        http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.0.xsd 
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.0.xsd">

		<!-- Configuration for aspect schema selector before any transaction starts -->
		<bean id="schemaSelector" class="com.siemens.rcs.dc.rest.db.aop.schemaselector.SchemaSelectorAspect">
			<property name="order" value="500"/>
		</bean>
		<aop:config>
			<aop:aspect ref="schemaSelector">
				<aop:pointcut id="setSchema" expression="(execution(* com.siemens.rcs.dc.*.dao.impl.*.*(..))) and @annotation(com.siemens.rcs.dc.rest.db.aop.schemaselector.SchemaSelector)"/>
				<aop:before pointcut-ref="setSchema" method="schemaSelectorMethod"/>
			</aop:aspect>		
		</aop:config>
		<!-- END -->

	</beans>
	```
    2. Import schema-swappable-config.xml in your application. You need to include this xml file in classpath.
	```java
		@ImportResource({ "classpath:schema-swappable-config.xml" })
	```
