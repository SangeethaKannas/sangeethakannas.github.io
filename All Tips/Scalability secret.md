## 8 reasons they were able to do so:

1) Single Responsibility Principle:
- They focused only on the core feature - messaging instead of building a full-fledged social media platform.

2) Technology Stack:
- They used Erlang programming language to implement core functionalities of WhatsApp servers since it provides extremely high scalability and availability with tiny footprint and supports hot loading.

3) Scalability:
- They took a hybrid approach and scaled both vertically and horizontally to keep the costs and operational complexity low.
- They used FreeBSD operating system to run the servers and fine-tuned it to handle 2 million+ connections per server.

4) Load Testing:
- Load testing was performed on a regular basis  by either generating artificial production traffic or configuring DNS to redirect more traffic toward a particular server to identify single points of failure easily.

5) Do not reinvent the wheel:
- They made heavy use of open source libraries like Ejabberd (for real-time messaging server) and 3rd party services like Google Push (for push notifications) instead of writing everything from scratch.

6) Cross-Cutting Concerns:
- They gave a huge emphasis on things like logging, monitoring alerting, exception handling and security to improve product quality and fix issues faster.

7) Flywheel Effect:
- They employed continuous feedback cycle by measuring metrics such as CPU, context switches and system calls at regular intervals to identify and eliminate bottlenecks.

8) Small Team Size:
- To reduce communication overhead and avoid degradation in productivity, WhatsApp engineering team was kept small.