package com.cour.backserver.controller;

import com.cour.backserver.entity.*;
import com.cour.backserver.repository.ProductRadiusRepository;
import com.cour.backserver.repository.UserRepository;
import com.cour.backserver.service.EmailService;
import com.cour.backserver.service.ReportService;
import com.cour.backserver.service.RequestService;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RequestController {
    private final RequestService requestService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ProductRadiusRepository productRadiusRepository;
    private final ReportService reportService;
    @Autowired
    public RequestController(RequestService requestService, UserRepository userRepository, EmailService emailService, ProductRadiusRepository productRadiusRepository, ReportService reportService) {
        this.requestService = requestService;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.productRadiusRepository = productRadiusRepository;
        this.reportService = reportService;
    }

    @PostMapping("/req")
    public void create(@RequestBody Request request){
        requestService.saveRequest(request);

    }
    @PostMapping("/req/pay")
    public void pay(@RequestBody Request request){
        String to = userRepository.getById(request.getClient().longValue()).getEmail();
        String subject = "Чек оплаты";
        String text = "Ваш чек по заказу №"+request.getId()+"\nСодержание заказа\n";
        List<Cart_service> lcs= request.getCart_services().stream().toList();
        for (Cart_service cs: lcs
             ) {
            text +=  cs.getService().getName() + " " + cs.getCost() + "руб.\n";
        }
        if(request.getCart_products() != null){
            List<Cart_product> lcp= request.getCart_products().stream().toList();
            for (Cart_product cs: lcp
            ) {
                text +=  cs.getProduct().getName()+" "+ cs.getProduct().getMaker()+" "+ productRadiusRepository.findById(cs.getProductradius().longValue()).get().getRadius().getRadius()+" "+ cs.getCount() + "шт. " + " " + cs.getCost() + "руб.\n";
            }
        }
        text += "Дата оплаты " + LocalDate.now().getDayOfMonth() + " " + LocalDate.now().getMonth().getDisplayName(TextStyle.FULL,new Locale("ru")) + " " + LocalDate.now().getYear()+"\n";
        text += "Итоговая сумма " + request.getSumma()+ "руб.\n";
        text += "С уважением команда YDDYcustoms";
        emailService.sendEmail(to, subject, text);
        requestService.payRequest(request);
    }
    @PutMapping("/req")
    public void del(@RequestBody Request request){
        requestService.cancelRequest(request);
    }
    @PostMapping("/clientsreq")
    public List<Request> list(@RequestBody User client){
        return  requestService.getByClient(client);
    }

    @PostMapping("/req/times")
    public List<List<LocalDateTime>> sdf(@RequestBody LocalDateTime ldt){
        ldt = ldt.plusHours(3);
        List<List<LocalDateTime>> times = new ArrayList<List<LocalDateTime>>();
        for (Request req:
        requestService.getBetweenDate(ldt)) {
            List<LocalDateTime> tp = new ArrayList<LocalDateTime>();
            tp.add(req.getStdate());
            tp.add(req.getEnddate());
            times.add(tp);
        }
        Collections.reverse(times);
        return times;
    }
    @PostMapping("/req/report")
    public ResponseEntity<Resource> downloadFile(@RequestBody Request request) throws IOException {

            InputStreamResource resource = reportService.generateReport(request);

            // Возвращаем ресурс в ответе сервера
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=АРТ.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);

    }
}
