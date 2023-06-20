package com.cour.backserver.service;

import com.cour.backserver.entity.Cart_product;
import com.cour.backserver.entity.Cart_service;
import com.cour.backserver.entity.Request;
import com.cour.backserver.repository.ProductRadiusRepository;
import com.cour.backserver.repository.RequestRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

@Service
public class ReportService {
    private final RequestRepository requestRepository;
    private final ProductRadiusRepository productRadiusRepository;

    public ReportService(RequestRepository requestRepository, ProductRadiusRepository productRadiusRepository) {
        this.requestRepository = requestRepository;
        this.productRadiusRepository = productRadiusRepository;
    }
    private static InputStream getTemplateInputStream() throws IOException {
        File file = ResourceUtils.getFile("classpath:template.xlsx");;
        return new FileInputStream(file);
    }
    public InputStreamResource generateReport(Request request) throws IOException {
        InputStream inputStream = getTemplateInputStream();
        
        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            sheet.getRow(1).getCell(7).setCellValue(request.getId());
            sheet.getRow(2).getCell(7).setCellValue(request.getStdate().getDayOfMonth() + " " + request.getStdate().getMonth().getDisplayName(TextStyle.FULL,new Locale("ru")) + " " + request.getStdate().getYear());
            sheet.getRow(13).getCell(8).setCellValue(request.getSumma());

            Integer row = 12;
            sheet.shiftRows(13,sheet.getLastRowNum(),request.getCart_products().size()+request.getCart_services().size(),true,true);
            if(request.getCart_products() != null) {
                for (Cart_product cp : request.getCart_products()) {
                    Row newRow = sheet.createRow(row);
                    newRow.createCell(2).setCellValue("Товар");
                    newRow.createCell(3).setCellValue(cp.getProduct().getName());
                    newRow.createCell(4).setCellValue(cp.getProduct().getMaker() + ' ' + productRadiusRepository.findById(cp.getProductradius().longValue()).get().getRadius().getRadius());
                    newRow.createCell(5).setCellValue(cp.getCount());
                    newRow.createCell(6).setCellValue((cp.getCost()+"руб."));
                    row++;
                }
            }
            for (Cart_service cs:request.getCart_services()) {
                Row newRow = sheet.createRow(row);
                newRow.createCell(2).setCellValue("Услуга");
                newRow.createCell(3).setCellValue(cs.getService().getName());
                newRow.createCell(4).setCellValue("—");
                newRow.createCell(5).setCellValue(1);
                newRow.createCell(6).setCellValue(cs.getCost());
                row++;
            }

            File tempFile = File.createTempFile("temp", ".xlsx");
            FileOutputStream out = new FileOutputStream(tempFile);
            workbook.write(out);
            out.close();
            return new InputStreamResource(new FileInputStream(tempFile));

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
